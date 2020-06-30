import {trigger,style,animate,query,stagger,transition} from '@angular/animations';
import { Optional } from '@angular/core';

export const loadingAnimation = function () {
    return trigger('loading', [
        transition('* => *', [
            query(':leave',[
                stagger(100,[
                    animate('350ms',style({opacity:0}))
                ])
            ], {optional:true}),
            query(':enter',[
                style({opacity:0}),
                stagger(100,[
                    animate('350ms',style({opacity:1}))
                ])
            ], {optional:true})
        ])
    ]);
}