import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-artifact-sub-item',
  templateUrl: './artifact-sub-item.component.html',
  styleUrls: ['./artifact-sub-item.component.scss']
})
export class ArtifactSubItemComponent implements OnInit {

  @Input() artifactSubItemClass: string;
  @Input() artifactSubItemName: string;
  @Input() artifactSubItemQty: number;
  @Input() artifactSubItemMeasurement: string;

  constructor() { }

  ngOnInit() {}

}
