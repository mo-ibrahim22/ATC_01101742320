import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ArabicNumbersPipe } from "../../pipes/arabic-numbers.pipe";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [CommonModule, ArabicNumbersPipe],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  constructor(
    public translate: TranslateService,
  ) {}
}
