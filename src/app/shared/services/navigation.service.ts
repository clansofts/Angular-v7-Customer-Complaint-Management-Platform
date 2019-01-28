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
            name: 'Customer Service',
            description: 'Make a complaint or track an issue.',
            type: 'dropDown',
            icon: 'i-Bar-Chart',
            sub: [
                { icon: 'i-Clock-3', name: 'Make Complaints', state: '/customer/v1', type: 'link' },
                { icon: 'i-Clock-4', name: 'Track Issue', state: '/customer/v2', type: 'link' },
                { icon: 'i-Clock-3', name: 'Enquiry', state: '/customer/v3', type: 'link' },
                { icon: 'i-Clock-4', name: 'Request', state: '/customer/v4', type: 'link' }
            ]
        }
    ];

    admin1: IMenuItem[] = [
        {
            name: 'Resolution Champion',
            description: 'Assign issues and track reports.',
            type: 'dropDown',
            icon: 'i-Bar-Chart',
            sub: [
                { icon: 'i-Clock-3', name: 'Reports', state: '/customer/v1', type: 'link' },
                { icon: 'i-Clock-4', name: 'Tickets', state: '/customer/v2', type: 'link' },
                { icon: 'i-Clock-3', name: 'Message', state: '/customer/v3', type: 'link' },
                { icon: 'i-Clock-4', name: 'Archive', state: '/customer/v4', type: 'link' }
            ]
        }
    ];

    admin2: IMenuItem[] = [
        {
            name: 'Resolution Team',
            description: 'View and monitor customer complaints',
            type: 'dropDown',
            icon: 'i-Bar-Chart',
            sub: [
                { icon: 'i-Clock-3', name: 'Open Tickets', state: '/customer/v1', type: 'link' },
                { icon: 'i-Clock-4', name: 'Tickets', state: '/customer/v2', type: 'link' },
                { icon: 'i-Clock-3', name: 'Message', state: '/customer/v3', type: 'link' },
                { icon: 'i-Clock-4', name: 'Archive', state: '/customer/v4', type: 'link' }
            ]
        }
    ];


    // sets iconMenu as default;
    menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
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
            default:
                this.menuItems.next(this.defaultMenu);
        }
    }
}
