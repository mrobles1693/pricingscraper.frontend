import {
    animate,
    keyframes,
    query,
    stagger,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';

export const PsAnimations = [
  // trigger('fabToggler', [
  //   state('inactive', style({
  //     transform: 'rotate(0deg)'
  //   })),
  //   state('active', style({
  //     transform: 'rotate(225deg)'
  //   })),
  //   state('active2', style({
  //     transform: 'rotate(360deg)'
  //   })),
  //   transition('* <=> *', animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  // ]),
  // trigger('speedDialStagger', [
  //   transition('* => *', [

  //     query(':enter', style({ opacity: 0 }), {optional: true}),

  //     query(':enter', stagger('40ms',
  //       [
  //         animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
  //           keyframes(
  //             [
  //               style({opacity: 0, transform: 'translateY(10px)'}),
  //               style({opacity: 1, transform: 'translateY(0)'}),
  //             ]
  //           )
  //         )
  //       ]
  //     ), {optional: true}),

  //     query(':leave',
  //       animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
  //         keyframes([
  //           style({opacity: 1}),
  //           style({opacity: 0}),
  //         ])
  //       ), {optional: true}
  //     )

  //   ])
  // ]),
  trigger('detailExpand', [
    state('collapsed', style({height: '0px', minHeight: '0'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ]),
  // trigger('fabIcon', [
  //   state('default', style({ transform: 'rotate(0deg)' })),
  //   state('rotated', style({ transform: 'rotate(-360deg)' })),
  //   transition('* <=> *', animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  // ]),
];