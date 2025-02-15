/* eslint-disable @typescript-eslint/no-empty-object-type */
interface IComponent<T = {}> extends React.FC<React.PropsWithChildren<T>> {}
interface ISvgComponent<T = {}>
  extends IComponent<React.SVGProps<SVGSVGElement> & T> {}
