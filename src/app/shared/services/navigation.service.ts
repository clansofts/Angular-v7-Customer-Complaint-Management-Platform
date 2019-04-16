import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IMenuItem {
    id?: string;
    title?: string;
    description?: string;
    type: string;       // Possible values: link/dropDown/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;      // Material icon name
    tooltip?: string;   // Tooltip text
    disabled?: boolean; // If true, item will not be appeared in sidenav.
    sub?: IChildItem[]; // Dropdown items
    badges?: IBadge[];
    active?: boolean;
}
export interface IChildItem {
    id?: string;
    parentId?: string;
    type?: string;
    name: string;       // Display text
    state?: string;     // Router state
    icon?: string;
    sub?: IChildItem[];
    active?: boolean;
}

interface IBadge {
    color: string;      // primary/accent/warn/hex color codes(#fff000)
    value: string;      // Display text
}

interface ISidebarState {
    sidenavOpen?: boolean;
    childnavOpen?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public sidebarState: ISidebarState = {
        sidenavOpen: true,
        childnavOpen: false
    };
    constructor() {
    }

    defaultMenu: IMenuItem[] = [
        {
            type: 'dropDown',
            icon: 'i-Business-Mens',
            sub: [
                { icon: 'i-Speach-Bubble-3', name: 'Make Complaints', state: '/customer/complaints', type: 'link' },
                { icon: 'i-File-Search', name: 'Track Issue', state: '/customer/issuestracking', type: 'link' },
            ]
        }
    ];
    // RC
    admin1: IMenuItem[] = [
        {
            type: 'dropDown',
            icon: 'i-Male-21',
            sub: [
                { icon: 'i-Support', name: 'Make Complaints', state: '/customer/complaints', type: 'link' },
                { icon: 'i-File-Search', name: 'Track Issue', state: '/customer/issuestracking', type: 'link' },
            ]
        },
        {
            type: 'dropDown',
            icon: 'i-Support',
            sub: [
                /* { icon: 'i-Statistic', name: 'Dashboard', state: '/admin-rc/complaints-dashboard', type: 'link' }, */
                { icon: 'i-Movie-Ticket', name: 'Ticket Management', state: '/admin-rc/opentickets', type: 'link' },
            ]
        },
        /* {
            type: 'dropDown',
            icon: 'i-Gear-2',
            sub: [
                { icon: 'i-Male', name: 'Profile Setting', state: '/admin-rt/user-profile', type: 'link' },
            ]
        } */
    ];
    // RT
    admin2: IMenuItem[] = [
        {
            type: 'dropDown',
            icon: 'i-Male-21',
            sub: [
                { icon: 'i-Support', name: 'Make Complaints', state: '/customer/complaints', type: 'link' },
                { icon: 'i-File-Search', name: 'Track Issue', state: '/customer/issuestracking', type: 'link' },
            ]
        },
        {
            type: 'dropDown',
            icon: 'i-Check',
            sub: [
                /* { icon: 'i-Support', name: 'Team Dashboard', state: '/admin-rt/team-dashboard', type: 'link' }, */
                { icon: 'i-Business-Mens', name: 'Team Issues Assigned', state: '/admin-rt/ticket-resolution', type: 'link' },
                /* { icon: 'i-Clock-3', name: 'Message', state: '/admin-rt/complaint-messages', type: 'link' },*/
                { icon: 'i-Male', name: 'My Assigned Issues', state: '/admin-rt/my-issues', type: 'link' }
            ]
        },
        {
            type: 'dropDown',
            icon: 'i-Conference',
            sub: [
                { icon: 'i-Add-User', name: 'Add Team Member', state: '/admin-rt/add-user', type: 'link' },
                /*  { icon: 'i-Remove-User', name: 'Remove Team Member', state: '/admin-rt/remove-user', type: 'link' }, */
            ]
        },
        {
            type: 'dropDown',
            icon: 'i-Gear-2',
            sub: [
                { icon: 'i-Male', name: 'Profile Setting', state: '/admin-rt/user-profile', type: 'link' },
            ]
        }
    ];

    admin3: IMenuItem[] = [
        {
            type: 'dropDown',
            icon: 'i-Consulting',
            sub: [
                { icon: 'i-Speach-Bubble-3', name: 'Make Complaints', state: '/customer/complaints', type: 'link' },
                { icon: 'i-File-Search', name: 'Track Issue', state: '/customer/issuestracking', type: 'link' },
                { icon: 'i-Eye', name: 'View Issues', state: '/customer/viewissues', type: 'link' },
            ]
        }
    ];


    // sets iconMenu as default;
    menuItems = new BehaviorSubject<IMenuItem[]>(null);
    // navigation component has subscribed to this Observable
    menuItems$ = this.menuItems.asObservable();

    // You can customize this method to supply different menu for
    // different user type.
    publishNavigationChange(userType: string) {
        switch (userType) {
            case 'admin1':
                this.menuItems.next(this.admin1);
                break;
            case 'admin2':
                this.menuItems.next(this.admin2);
                break;
            case 'admin3':
                this.menuItems.next(this.admin3);
                break;
            default:
                this.menuItems.next(this.defaultMenu);
        }
    }
}
