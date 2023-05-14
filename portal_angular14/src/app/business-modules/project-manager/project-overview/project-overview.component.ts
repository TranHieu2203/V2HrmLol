import { Component, ViewEncapsulation, ViewChild, OnInit, AfterViewInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { extend, addClass } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsModel, CardSettingsModel, SwimlaneSettingsModel, DialogSettingsModel, CardRenderedEventArgs } from '@syncfusion/ej2-angular-kanban';
import { cardData } from './data';

import { RandomAvatarService } from 'src/app/services/random-avatar.service';
import { ProjectManagerService } from '../project-manager.service';

@Component({
    selector: 'app-project-overview',
    templateUrl: './project-overview.component.html',
    styleUrls: ['./project-overview.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ProjectOverviewComponent implements OnInit, AfterViewInit, OnDestroy {

    mousemoveListenerFn!: () => void;

    overviewTop!: number;
    overviewLeft!: number;

    @ViewChild('kanbanObj') kanbanObj!: KanbanComponent;
    @ViewChild('kanbanRef') kanbanRef!: ElementRef;

    public kanbanData: any[] = extend([], cardData, undefined, true) as any[];
    public columns: ColumnsModel[] = [
        { headerText: 'To Do', keyField: 'Open', allowToggle: true },
        { headerText: 'In Progress', keyField: 'InProgress', allowToggle: true },
        { headerText: 'In Review', keyField: 'Review', allowToggle: true },
        { headerText: 'Done', keyField: 'Close', allowToggle: true }
    ];
    public cardSettings: CardSettingsModel = {
        headerField: 'Title',
        template: '#cardTemplate',
        selectionType: 'Multiple'
    };
    public dialogSettings: DialogSettingsModel = {
        fields: [
            { text: 'ID', key: 'Title', type: 'TextBox' },
            { key: 'Status', type: 'DropDown' },
            { key: 'Assignee', type: 'DropDown' },
            { key: 'RankId', type: 'TextBox' },
            { key: 'Summary', type: 'TextArea' }
        ]
    };
    public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'Assignee' };

    constructor(
        private randomAvatarService: RandomAvatarService,
        private renderer: Renderer2,
        private projectManagerService: ProjectManagerService,
    ) {

    }

    ngOnInit(): void {
        this.kanbanData.map(x => x.avatar = this.randomAvatarService.get());
        this.projectManagerService.centerOffsetTop.subscribe(x => {
            this.overviewTop = this.projectManagerService.overviewOffsetTop.value - x;
        })
        this.projectManagerService.overviewOffsetTop.subscribe(x => {
            this.overviewTop = x - this.projectManagerService.centerOffsetTop.value;
        })

    }

    ngAfterViewInit(): void {

        this.overviewLeft = this.kanbanRef.nativeElement.getBoundingClientRect().left;

        this.mousemoveListenerFn = this.renderer.listen('window', 'mousemove', (e: MouseEvent) => {
            if (e.which === 1) {
                const s = Array.from(document.getElementsByClassName('e-cloned-card') as HTMLCollectionOf<HTMLElement>)
                if (s.length) {
                    s[0].style.top = (e.clientY - this.overviewTop + window.scrollY).toString() + 'px';
                    s[0].style.left = (e.clientX - this.overviewLeft).toString() + 'px';
                }
            }
        })

        this.projectManagerService.overviewOffsetTop.next(this.kanbanRef.nativeElement.getBoundingClientRect().top);
    }

    ngOnDestroy(): void {
        if (this.mousemoveListenerFn) this.mousemoveListenerFn();
    }

    public getString(assignee: string): string {
        const regex = /\b(\w)/g;
        return assignee.match(regex)!.join('').toUpperCase();
    }

    cardRendered(args: CardRenderedEventArgs): void {
        const val: string = (<{ [key: string]: Object }>(args.data))['Priority'] as string;
        addClass([args.element], val);
    }

    addTask() {
        const cardIds = this.kanbanObj.kanbanData.map((obj: { [key: string]: string }) => parseInt(obj['Id'].replace('Task ', ''), 10));
        const cardCount: number = Math.max.apply(Math, cardIds) + 1;
        const cardDetails = {
            Id: 'Task ' + cardCount, Status: 'Open', Priority: 'Normal',
            Assignee: 'Andrew Fuller', Estimate: 0, Tags: '', Summary: ''
        };
        this.kanbanObj.openDialog('Add', cardDetails);
    }
}
