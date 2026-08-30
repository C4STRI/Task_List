import Input from '../../atoms/Input/Input';
import Text from '../../atoms/Text/Text';
import './FormField.css';

/**
 * MOLECULE: FormField
 * Combina dos átomos (Text + Input) para formar una unidad con sentido:
 * "un campo de formulario". Ya no es indivisible, pero sigue siendo
 * genérico: no sabe que se usará para crear tareas.
 */
export default function FormField({ id, label, value, onChange, placeholder }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>
        <Text as="span" variant="meta">{label}</Text>
      </label>
      <Input id={id} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}
