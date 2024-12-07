import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DespensaComponent } from './components/despensa/despensa.component';
import { NovoProdutoComponent } from './components/novo-produto/novo-produto.component';
import { NavComponent } from "./core/nav/nav.component";
import { startWith } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  template: `
    <!--  -->
    @if(exibirNavBar()){
      <app-nav/>
    }
    <router-outlet/>
  `
})
export class AppComponent {
  title = 'foodstock';

  #router=inject(Router)

  exibirNavBar(){
    return this.#router.url !== '/login' && this.#router.url !== '/cadastro'
    && this.#router.url !== '/recuperar' && this.#router.url !== '/' && this.#router.url !== '/**'
    && !this.#router.url.startsWith('/alterar-senha')
  }
}
