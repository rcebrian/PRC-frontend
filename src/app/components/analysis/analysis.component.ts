import { Component, OnInit } from '@angular/core';

import { AnalysisService } from 'src/app/analysis.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  msg: Text;
  lib: number;
  data: Text;

  constructor(private analysisService: AnalysisService) { }

  ngOnInit(): void {
  }

  getAnalysis() {
    this.analysisService.getAnalysis(this.lib, this.msg);
    alert(`${this.lib} -> ${this.msg}`);
  }
}
