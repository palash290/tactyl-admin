import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ValidationErrorService } from '../../../services/validation-error.service';

@Component({
  selector: 'app-create-discount',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './create-discount.component.html',
  styleUrl: './create-discount.component.css'
})
export class CreateDiscountComponent {
  allUsers: any[] = [];
  allPlans: any[] = [];
  id: string | null = null;
  isLoading = false;
  isEditMode = false;

  discountForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CommonService,
    private toastr: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    public validationErrorService: ValidationErrorService
  ) {
    this.discountForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      discount_type: ['percentage', Validators.required],
      discount_value: [null, [Validators.required, Validators.min(0.01)]],
      max_discount_amount: [null, Validators.min(0.01)],
      min_plan_price: [0, [Validators.required, Validators.min(0)]],
      scope: ['all', Validators.required],
      plan_id: [null],
      eligibility: ['all', Validators.required],
      eligible_user_id: [null],
      usage_limit: [null, Validators.min(1)],
      expires_at: ['', futureDateTimeValidator()],
      is_active: [true]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.isEditMode = !!this.id;

    this.setupConditionalValidation();
    this.getAllUsers();
    this.getAllPlans();

    if (this.isEditMode) {
      this.getById();
    }
  }

  get formControls() {
    return this.discountForm.controls;
  }

  setupConditionalValidation() {
    this.applyConditionalValidators();

    this.formControls['scope'].valueChanges.subscribe(() => {
      this.applyConditionalValidators();
    });

    this.formControls['eligibility'].valueChanges.subscribe(() => {
      this.applyConditionalValidators();
    });
  }

  applyConditionalValidators() {
    const planControl = this.formControls['plan_id'];
    const eligibleUserControl = this.formControls['eligible_user_id'];

    if (this.formControls['scope'].value === 'plan') {
      planControl.setValidators([Validators.required, Validators.min(1)]);
    } else {
      planControl.clearValidators();
      planControl.setValue(null, { emitEvent: false });
    }
    planControl.updateValueAndValidity({ emitEvent: false });

    if (this.formControls['eligibility'].value === 'specific_user') {
      eligibleUserControl.setValidators([Validators.required, Validators.min(1)]);
    } else {
      eligibleUserControl.clearValidators();
      eligibleUserControl.setValue(null, { emitEvent: false });
    }
    eligibleUserControl.updateValueAndValidity({ emitEvent: false });
  }

  getById() {
    if (!this.id) {
      return;
    }

    this.isLoading = true;
    this.service.get(`admin/discounts/${this.id}`).subscribe({
      next: (resp: any) => {
        const discount = resp?.data;
        this.isLoading = false;

        if (!resp?.success || !discount) {
          this.toastr.warning(resp?.message || 'Unable to load discount details.');
          return;
        }

        this.discountForm.patchValue({
          code: discount.code ?? '',
          discount_type: discount.discount_type ?? 'percentage',
          discount_value: discount.discount_value ?? null,
          max_discount_amount: discount.max_discount_amount ?? null,
          min_plan_price: discount.min_plan_price ?? 0,
          scope: discount.scope ?? 'all',
          plan_id: discount.plan_id ?? null,
          eligibility: discount.eligibility ?? 'all',
          eligible_user_id: discount.eligible_user_id ?? null,
          usage_limit: discount.usage_limit ?? null,
          expires_at: this.formatDateTimeLocal(discount.expires_at),
          is_active: discount.is_active ?? true
        });

        this.applyConditionalValidators();
      },
      error: (error) => {
        this.isLoading = false;
        this.toastr.warning(error.error?.message || 'Something went wrong!');
      }
    });
  }

  getAllPlans() {
    this.service.get(`admin/plans`).subscribe({
      next: (resp: any) => {
        this.allPlans = (resp?.data || []).filter(
          (plan: any) => ![1, 3].includes(plan.plan_id)
        );
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  getAllUsers() {
    this.service.get(`admin/users`).subscribe({
      next: (resp: any) => {
        this.allUsers = resp?.data || [];
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  submitDiscount() {
    this.discountForm.markAllAsTouched();

    if (this.discountForm.invalid) {
      return;
    }

    const payload = this.buildPayload();
    this.isLoading = true;

    const request$ = this.isEditMode && this.id
      ? this.service.patch(`admin/discounts/${this.id}`, payload)
      : this.service.post(`admin/discounts`, payload);

    request$.subscribe({
      next: (resp: any) => {
        this.isLoading = false;

        if (resp?.success) {
          this.toastr.success(resp.message || `Discount ${this.isEditMode ? 'updated' : 'created'} successfully.`);
          this.router.navigate(['/main/discount-management']);
        } else {
          this.toastr.warning(resp?.message || 'Unable to save discount.');
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.toastr.warning(error.error?.message || 'Something went wrong!');
      }
    });
  }

  private buildPayload() {
    const raw = this.discountForm.getRawValue();

    return {
      code: raw.code?.trim(),
      discount_type: raw.discount_type,
      discount_value: this.toNumberOrNull(raw.discount_value),
      max_discount_amount: this.toNumberOrNull(raw.max_discount_amount),
      min_plan_price: this.toNumberOrZero(raw.min_plan_price),
      scope: raw.scope,
      plan_id: raw.scope === 'plan' ? this.toNumberOrNull(raw.plan_id) : null,
      eligibility: raw.eligibility,
      eligible_user_id: raw.eligibility === 'specific_user' ? this.toNumberOrNull(raw.eligible_user_id) : null,
      usage_limit: this.toNumberOrNull(raw.usage_limit),
      expires_at: raw.expires_at ? new Date(raw.expires_at).toISOString() : null,
      ...(this.isEditMode ? { is_active: !!raw.is_active } : {})
    };
  }

  private toNumberOrNull(value: any): number | null {
    if (value === '' || value === null || value === undefined) {
      return null;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }

  private toNumberOrZero(value: any): number {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  private formatDateTimeLocal(value: string | null) {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '';
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}

function futureDateTimeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const inputDate = new Date(control.value);
    if (Number.isNaN(inputDate.getTime())) {
      return { pattern: true };
    }

    return inputDate.getTime() > Date.now() ? null : { futureDate: true };
  };
}
