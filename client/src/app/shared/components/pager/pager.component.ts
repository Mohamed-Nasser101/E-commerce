import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageChangedEvent} from "ngx-bootstrap/pagination";

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  @Input() totalCount: number;
  @Input() pageSize: number;
  @Input() pageNumber: number;
  @Output() pageChange = new EventEmitter<PageChangedEvent>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onPageChange(event: PageChangedEvent) {
    this.pageChange.emit(event);
  }
}
