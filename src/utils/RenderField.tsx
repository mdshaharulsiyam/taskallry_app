import React from "react";
import DatePicker from "../components/ui/inputs/DatePicker";
import Input from "../components/ui/inputs/Input";
import InputCheckbox from "../components/ui/inputs/InputCheckbox";
import LocationInput from '../components/ui/inputs/LocationInput';
import OptionGridInput from "../components/ui/inputs/OptionGridInput";
import PasswordInput from "../components/ui/inputs/PasswordInput";
import RangeSelect from "../components/ui/inputs/RangeSelect";
import SelectInput from "../components/ui/inputs/SelectInput";
import TextArea from "../components/ui/inputs/TextArea";
import TimePicker from "../components/ui/inputs/TimePicker";
import { FieldsType, FieldType, KeyboardType } from "../types/Types";
// import LocationInput from "../components/ui/inputs/LocationInput";

export const RenderField = (
  field: FieldsType,
  setFields: React.Dispatch<React.SetStateAction<FieldsType[]>>
) => {
  if (field.type == FieldType.CHECKBOX) {
    return (
      <InputCheckbox
        key={field.name}
        handler={(name, value) =>
          setFields((prev) =>
            prev.map((field) =>
              field.name === name ? { ...field, value, error: false } : field
            )
          )
        }
        error={field?.error}
        label={field?.label}
        name={field?.name}
        value={field?.value as boolean}
      />
    );
  }

  if (field.type == FieldType.PASSWORD) {
    return (
      <PasswordInput
        key={field.name}
        error={field?.error}
        handler={(name, value) =>
          setFields((prev) =>
            prev.map((field) =>
              field.name === name ? { ...field, value, error: false } : field
            )
          )
        }
        placeHolder={field?.placeHolder}
        label={field?.label}
        name={field?.name}
        value={field?.value as string}
        keyboard={KeyboardType.DEFAULT}
      />
    );
  }

  if (field.type == FieldType.STRING) {
    return (
      <Input
        placeHolder={field?.placeHolder}
        error={field?.error}
        key={field.name}
        handler={(name, value) =>
          setFields((prev) =>
            prev.map((field) =>
              field.name === name ? { ...field, value, error: false } : field
            )
          )
        }
        label={field?.label}
        name={field?.name}
        value={field?.value as string}
        keyboard={field?.keyboard}
      />
    );
  }

  if (field.type == FieldType.TEXTAREA) {
    return (
      <TextArea
        placeHolder={field?.placeHolder}
        error={field?.error}
        key={field.name}
        handler={(name, value) =>
          setFields((prev) =>
            prev.map((field) =>
              field.name === name ? { ...field, value, error: false } : field
            )
          )
        }
        label={field?.label}
        name={field?.name}
        value={field?.value as string}
        keyboard={field?.keyboard}
      />
    );
  }

  if (field.type == FieldType.SELECT) {
    return (
      <SelectInput
        placeHolder={field?.placeHolder}
        error={field?.error}
        key={field.name}
        handler={(name, value) =>
          setFields((prev) =>
            prev.map((field) =>
              field.name === name ? { ...field, value, error: false } : field
            )
          )
        }
        multiple={field?.multiple}
        label={field?.label}
        name={field?.name}
        value={field?.value as string | string[]}
        required={field?.required}
        options={field?.options as { label: string; value: string }[]}
      />
    );
  }

  if (field.type == FieldType.DATE) {
    return (
      <DatePicker
        placeHolder={field?.placeHolder}
        error={field?.error}
        key={field.name}
        handler={(name, value) =>
          setFields((prev) =>
            prev.map((field) =>
              field.name === name ? { ...field, value, error: false } : field
            )
          )
        }
        label={field?.label}
        name={field?.name}
        value={field?.value as string}
        required={field?.required}
      />
    );
  }
  if (field.type == FieldType.TIME) {
    return (
      <TimePicker
        placeHolder={field?.placeHolder}
        error={field?.error}
        key={field.name}
        handler={(name, value) =>
          setFields((prev) =>
            prev.map((field) =>
              field.name === name ? { ...field, value, error: false } : field
            )
          )
        }
        label={field?.label}
        name={field?.name}
        value={field?.value as string}
        required={field?.required}
      />
    );
  }

  if (field.type == FieldType.RANGE) {
    return (
      <RangeSelect
        label={field?.label}
        name={field?.name}
        error={field?.error}
        value={field?.value as number | { min: number; max: number }}
        min={field?.min}
        max={field?.max}
        step={field?.step}
        range={field?.range}
        handler={(name, value) =>
          setFields((prev) =>
            prev.map((f) => (f.name === name ? { ...f, value, error: false } : f))
          )
        }
      />
    );
  }
  if (field.type == FieldType.GRIDINPUT) {
    return (
      <OptionGridInput
        options={field?.options as { label: string; value: string }[]}
        value={field?.value as string}
        handler={(name, value) =>
          setFields((prev) =>
            prev.map((f) => (f.name === name ? { ...f, value, error: false } : f))
          )
        }
        name={field?.name}
        label={field?.label}
        required={field?.required}
        showLabel={field?.showLabel}
      />
    );
  }
  if (field.type == FieldType.LOCATION) {
    return (
      <LocationInput
        placeHolder={field?.placeHolder}
        error={field?.error}
        key={field.name}
        handler={(name, value) =>
          setFields((prev) =>
            prev.map((f) => (f.name === name ? { ...f, value, error: false } : f))
          )
        }
        label={field?.label}
        name={field?.name}
        value={field?.value as string}
        required={field?.required}
      />
    );
  }
};
