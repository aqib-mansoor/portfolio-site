import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          name?: string;
          class?: string;
          src?: string;
          size?: string;
        },
        HTMLElement
      >;
    }
  }
}
