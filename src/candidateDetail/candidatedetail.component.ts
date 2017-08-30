import { Component, OnInit, Directive, ViewChild, ElementRef } from '@angular/core';
// import { CampaignInfo } from './../models/common/campaign.model';
import { CandidateListService } from '../candidatelist/services/candidatelist.service';
import { Store, Action } from '@ngrx/store';
import { LeverageAppStore } from '../store.interface';

//  import { BarGraph } from './../directives/d3.directive';
 import * as D3 from "d3";

@Component({
  selector: 'leverage-candidate-detail',
  template: `
  <div class="container-fluid">
  <div class="container">
    <div class="row">
      <div class="col-md-2">
        <div class="img-container">
          <img src="http://www.publicdomainpictures.net/pictures/190000/velka/young-business-woman-1470305665A9g.jpg"
          class="candidate-img img-responsive" />
        </div>
      </div>
      <div class="col-md-10 page-header">  
        <h1>{{ campaign[0].campaign.candidate_name }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-10">
        <h2>{{ campaign[0].campaign.campaigns[0].candidate_position}}</h2>
        <p>{{ campaign[0].campaign.campaigns[0].election_year}} {{ campaign[0].campaign.campaigns[0].election_cycle}}</p>
        <div>
        <div class="chart-item">{{ campaign[0].campaign.campaigns[0].campaign_summary }}}</div>
        <div #d3Chart></div>
        </div>
      </div>
    </div>
  </div>
</div>`,
providers: [CandidateListService],
})

export class CandidateDetailComponent implements OnInit  {
  @ViewChild('d3Chart') d3Chart: ElementRef
  chartElement: HTMLElement
  host: any;
  barChartData: any[];
  campaign: any[] = [];
  s: string;
  variable: string;
  private graphData: Array<Number>;
  constructor(private candidateListService: CandidateListService, private store: Store<LeverageAppStore>) {
    this.graphData = [10, 20, 30, 40, 60];
  }

  ngOnInit() {
    this.store.select(slice => slice.campaignSlice).subscribe(val => {
      if (val) {
        this.campaign.push(val.campaigns);
      }
    });

    // build D3 chart
    this.chartElement = this.d3Chart.nativeElement;
    this.host = D3.select(this.chartElement)
      .append("div").attr("class", "chart")
      .selectAll('div')
      .data(this.graphData).enter()
      .append("div")
      .style("width", function(d) { return d + "%"; })
      .text(function(d) { return d + "%"; });
  }

}
