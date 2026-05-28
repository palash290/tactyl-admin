import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
      {
            path: '',
            loadComponent: () => import('./components/log-in/log-in.component').then(m => m.LogInComponent)
      },
      {
            path: 'forgot-password',
            loadComponent: () => import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
      },
      {
            path: 'main',
            loadComponent: () => import('./components/main/main.component').then(m => m.MainComponent),
            // canActivate: [authGuard]
            children: [
                  {
                        path: '',
                        redirectTo: 'dashboard',
                        pathMatch: 'full'
                  },
                  {
                        path: 'dashboard',
                        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
                  },

                  {
                        path: 'my-profile',
                        loadComponent: () => import('./components/my-profile/my-profile.component').then(m => m.MyProfileComponent)
                  },
                  {
                        path: 'change-password',
                        loadComponent: () => import('./components/change-password/change-password.component').then(m => m.ChangePasswordComponent)
                  },
                  {
                        path: 'users',
                        loadComponent: () => import('./components/users/users.component').then(m => m.UsersComponent)
                  },
                  {
                        path: 'user-details',
                        loadComponent: () => import('./components/users/user-details/user-details.component').then(m => m.UserDetailsComponent)
                  },
                  {
                        path: 'workspace',
                        loadComponent: () => import('./components/workspace/workspace.component').then(m => m.WorkspaceComponent)
                  },
                  {
                        path: 'workspace-details',
                        loadComponent: () => import('./components/workspace/workspace-details/workspace-details.component').then(m => m.WorkspaceDetailsComponent)
                  },
                  {
                        path: 'team-details',
                        loadComponent: () => import('./components/workspace/team-details/team-details.component').then(m => m.TeamDetailsComponent)
                  },
                  {
                        path: 'members',
                        loadComponent: () => import('./components/workspace/team-details/members/members.component').then(m => m.MembersComponent)
                  },
                  {
                        path: 'members-details',
                        loadComponent: () => import('./components/workspace/team-details/members/view-member/view-member.component').then(m => m.ViewMemberComponent)
                  },

                  {
                        path: 'boards',
                        loadComponent: () => import('./components/workspace/team-details/boards/boards.component').then(m => m.BoardsComponent)
                  },
                  {
                        path: 'board-details',
                        loadComponent: () => import('./components/workspace/team-details/boards/view-board/view-board.component').then(m => m.ViewBoardComponent)
                  },
                   {
                        path: 'note-details',
                        loadComponent: () => import('./components/workspace/team-details/tasks/note-details/note-details.component').then(m => m.NoteDetailsComponent)
                  },

                  {
                        path: 'task-details',
                        loadComponent: () => import('./components/workspace/team-details/tasks/tasks-details/tasks-details.component').then(m => m.TasksDetailsComponent)
                  },

                  {
                        path: 'phases',
                        loadComponent: () => import('./components/workspace/team-details/phases/phases.component').then(m => m.PhasesComponent)
                  },

                  {
                        path: 'teams',
                        loadComponent: () => import('./components/teams/teams.component').then(m => m.TeamsComponent)
                  },

                  {
                        path: 'discount-management',
                        loadComponent: () => import('./components/discount-management/discount-management.component').then(m => m.DiscountManagementComponent)
                  },
                  {
                        path: 'create-discount',
                        loadComponent: () => import('./components/discount-management/create-discount/create-discount.component').then(m => m.CreateDiscountComponent)
                  }
            ]
      }
];
