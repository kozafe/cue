"use client";
import * as yup from "yup";
import Drawer from "@/components/ui/drawer";
import Input, { inputClassName } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, Control } from "react-hook-form";
import { MdSave } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdClose } from "react-icons/md";

export interface FormDrawerType {
  title?: string;
  msg?: string;
  id?: string;
}

interface Input {
  name: "title" | "msg";
  control: Control<FormDrawerType>;
}

const InputForm = ({ name, control }: Input) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      const { onChange, value } = field;
      const { message: error } = fieldState?.error || {};
      return (
        <Input
          onChange={onChange}
          value={value}
          placeholder="ex: Coding"
          className={`${
            error ? "border-[red]" : ""
          } border-[1px] font-bold text-xl`}
        />
      );
    }}
  />
);

const TextAreaForm = ({ control, name }: Input) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (!ref.current) return;
      ref.current.focus();
    }, 200);
  }, [!ref.current]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { onChange, value } = field;
        const { message: error } = fieldState?.error || {};
        return (
          <textarea
            onKeyDown={(e) => {
              const isPhone = window.innerWidth < 640;
              if (isPhone) return;
              if (e.key === "Enter") {
                if (e.shiftKey) return;
                e.preventDefault();
                const form = e.currentTarget.form;
                if (!form) return;
                const index = Array.prototype.indexOf.call(
                  form,
                  e.currentTarget
                );
                if (form.elements[index + 1]) {
                  const nextElement = form.elements[index + 1] as HTMLElement;
                  nextElement.focus();
                }
              }
              return e;
            }}
            ref={ref}
            placeholder="ex: I need to open up VS Code"
            className={`border-[1px] ${
              error ? "border-[red]" : ""
            } w-full text-md mt-3 h-[100px] ${inputClassName}`}
            value={value}
            onChange={onChange}
          />
        );
      }}
    />
  );
};

const Form = ({
  defaultValues,
  onSubmit,
  onClose,
}: {
  defaultValues: FormDrawerType;
  onSubmit: (value: FormDrawerType, isDelete?: boolean) => any;
  onClose: () => void;
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver<FormDrawerType>(
      yup.object().shape({
        title: yup.string().required(),
        msg: yup.string().required(),
        id: yup.string(),
      })
    ),
  });

  const [isPressed, setIsPressed] = useState(false);
  const isEdit = !!defaultValues.msg;
  const isPhone = window.innerWidth < 640;
  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values))}
      className="flex flex-col sm:justify-between h-full gap-2"
    >
      <div>
        <InputForm control={control} name="title" />
        <TextAreaForm control={control} name="msg" />
      </div>
      <div>
        {isEdit && !isPhone && (
          <button
            onClick={onClose}
            type="button"
            className="border-[1px] border-primaryColor flex mb-3 flex-row justify-center rounded-[4px] text-sm font-semibold bg-neutralColors-lightGray text-primaryColor w-full p-2 text-base"
          >
            <MdClose size={24} />
          </button>
        )}
        <button
          type="submit"
          className="flex flex-row justify-center rounded-[4px] text-sm font-semibold bg-accentColors-vibrantMustardYellow text-primaryColor w-full p-2 text-base"
        >
          <MdSave size={24} />
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={() => {
              if (!isPressed) return setIsPressed(true);

              onSubmit(defaultValues, true);
            }}
            className={`justify-center flex flex-row transition-all rounded-[4px] text-md font-semibold ${
              isPressed
                ? "bg-primaryColor text-accentColors-softCoralRed"
                : "bg-accentColors-softCoralRed text-primaryColor"
            } w-full p-2 text-base mt-3`}
          >
            {isPressed ? "Are you sure?" : <MdDelete size={24} />}
          </button>
        )}
      </div>
    </form>
  );
};

const FormDrawer = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: false | FormDrawerType;
  onClose: () => void;
  onSubmit: (value: FormDrawerType, isDelete?: boolean) => any;
}) => {
  return (
    <Drawer
      open={!!isOpen}
      direction="right"
      className="sm:min-w-[35vw] min-w-[90vw]"
      onClose={onClose}
    >
      <div className="bg-complementaryColor h-full p-4">
        {isOpen && (
          <Form defaultValues={isOpen} onSubmit={onSubmit} onClose={onClose} />
        )}
      </div>
    </Drawer>
  );
};

export default FormDrawer;
