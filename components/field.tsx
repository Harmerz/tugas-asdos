export default function Field({ name, label, type, autoComplete, required }) {
  return (
    <div className="mt-3">
      <label id={[name, 'label'].join('-')} htmlFor={[name, 'input'].join('-')}>
        {label} {required ? <span title="Required">*</span> : undefined}
      </label>
      <br />
      <input
        autoComplete={autoComplete}
        id={[name, 'input'].join('-')}
        name={name}
        required={required}
        type={type}
        className=" mt-2 w-72 rounded-lg px-4 py-3"
      />
    </div>
  )
}
