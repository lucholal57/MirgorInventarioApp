import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    $(document).ready(function () {
      var trigger = $('.hamburger'),
          overlay = $('.overlay'),
         isClosed = false;

        trigger.click(function () {
          hamburger_cross();
        });

        function hamburger_cross() {

          if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
          } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
          }
      }

      $('[data-toggle="offcanvas"]').click(function () {
            $('#wrapper').toggleClass('toggled');
      });
    });

  }
  logout(): void {
    console.log(localStorage)
    localStorage.removeItem("token")
    this.router.navigateByUrl('')
  }




}
