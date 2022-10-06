import { ComponentProps, useEffect, useId } from 'react';

import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

interface FormProps<TFormValues extends FieldValues>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  className?: string;
  id?: string;

  form: UseFormReturn<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
}

export const Form = <TFormValues extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  id,
  ...props
}: FormProps<TFormValues>) => {
  const uniqueId = useId();

  const { clearErrors, reset, formState, handleSubmit } = form;
  const { isSubmitting } = formState;

  useEffect(
    () => () => {
      // reset on unmount
      clearErrors();
      reset();
    },
    [clearErrors, reset]
  );

  return (
    <FormProvider {...form}>
      <form id={id ?? uniqueId} onSubmit={handleSubmit(onSubmit)} {...props}>
        <fieldset className={className} disabled={isSubmitting}>
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
};
