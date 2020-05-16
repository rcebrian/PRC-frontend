import { Component, OnInit } from '@angular/core';
import {RecommendationsService} from '../../../services/recommendations.service';
import {RecommendationModel} from '../../../models/recommendation.model';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html'
})
export class RecommendationsComponent implements OnInit {
  recommendations: RecommendationModel[];

  constructor(private recoService: RecommendationsService) { }

  ngOnInit(): void {
    this.getRecommendations();
  }

  getUrl(city: string) {
    return `url('https://source.unsplash.com/random?${city.toLowerCase()}')`;
  }

  getRecommendations() {
    this.recoService.getTopDestinations().subscribe(res => { this.recommendations = res.data; });
  }
}
