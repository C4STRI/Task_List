import './MainTemplate.css';

/**
 * TEMPLATE: MainTemplate
 * Define el ESQUELETO de la página (ancho máximo, columnas, espaciados)
 * sin saber nada del contenido real. Recibe organismos como children
 * a través de "slots" (props). Es puro layout.
 */
export default function MainTemplate({ header, form, list }) {
  return (
    <div className="main-template">
      <div className="main-template__inner">
        {header}
        {form}
        {list}
      </div>
    </div>
  );
}
