import 'styled-components';
import { MainThemeType } from './src/themes';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends MainThemeType { }
}
