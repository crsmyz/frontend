 import { Directive, ElementRef, Attribute, SimpleChange, Input } from '@angular/core';
 import * as d3 from 'd3';

 @Directive({
   selector: 'bar-graph',
 })

 export class BarGraph 
 {
   @Input() data: Array<any>;
   private divs: any;

   constructor ( elementRef: ElementRef, @Attribute('width') width: string, @Attribute('height') height: string) 
   {
     let el: any    = elementRef.nativeElement;  // reference to <bar-graph> element from the main template
     let graph: any = d3.select(el);             // D3 chart container

     // setup the graph
     this.divs = graph
         .append('div')
         .attr({
           'class': 'chart'
         })
         .style({
           'width': 400 + 'px',
           'height': 400 + 'px',
         })
         .selectAll('div');
   }

   // Render the D3 Bar Chart
   private __render(newValue: any): void
   {
     if( !newValue ) 
       return;
   
     // join the data and chain styles and bar text ... all the usual suspects
     this.divs.data(newValue).enter().append('div')
         .transition().ease('elastic')
         .style('width', (d:any) => d + '%')
         .text( (d:any) => d + '%');
   }

   // update render on change
   private ngOnChanges( changes: { [propertyName: string]: SimpleChange } ): void 
   {
     this.__render( this.data );
   }
 }