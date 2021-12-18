import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appRowHover]'
})
export class RowHoverDirective {

  constructor(private elementRef : ElementRef,private  renderer : Renderer2) { }

  @HostListener("mouseenter")
  onMouseEnter(){
    this.changeColor("gold");
  }

  @HostListener("mouseleave")
  onMouseLeave(){
    this.changeColor("");
  }

  private changeColor(color : string){
    this.renderer.setStyle(this.elementRef.nativeElement,"backgroundColor",color);
  }

}
