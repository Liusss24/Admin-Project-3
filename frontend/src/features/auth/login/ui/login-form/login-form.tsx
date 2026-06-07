'use client';

import { useI18n } from '@/app/providers/i18n-provider';
import { FormField } from '@/shared/ui/form-field/ui/form-field';
import { Input } from '@/shared/ui/input/ui/input';
import { Button } from '@/shared/ui/button/ui/button';
import { StatusMessage } from '@/shared/ui/status-message/ui/status-message';
import { statusMessageVariant } from '@/shared/ui/status-message/ui/status-message.constants';
import {
  buttonType,
  inputType,
} from '@/shared/constants/html-attributes.constants';
import { autoCompleteToken } from '@/shared/constants/autocomplete.constants';
import { buildFieldDescribedBy } from '@/shared/lib/forms/form-field-aria';
import { loginField } from '../../model/login.constants';
import { useLoginForm } from '../../hooks/use-login-form';
import { loginFormStyles } from './login-form.styles';

const USERNAME_ID = 'login-username';
const PASSWORD_ID = 'login-password';

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { t } = useI18n();
  const { values, errors, isSubmitting, formError, handleChange, handleSubmit } =
    useLoginForm({ onSuccess });
  const fields = t.auth.login.fields;

  return (
    <form className={loginFormStyles.form} onSubmit={handleSubmit} noValidate>
      {formError ? (
        <StatusMessage variant={statusMessageVariant.ERROR}>
          {formError}
        </StatusMessage>
      ) : null}

      <FormField
        htmlFor={USERNAME_ID}
        label={fields.username.label}
        error={errors.username}
        required
      >
        <Input
          id={USERNAME_ID}
          name={loginField.username}
          type={inputType.TEXT}
          value={values.username}
          placeholder={fields.username.placeholder}
          autoComplete={autoCompleteToken.USERNAME}
          hasError={Boolean(errors.username)}
          aria-describedby={buildFieldDescribedBy(
            USERNAME_ID,
            Boolean(errors.username),
          )}
          onChange={(event) =>
            handleChange(loginField.username, event.target.value)
          }
        />
      </FormField>

      <FormField
        htmlFor={PASSWORD_ID}
        label={fields.password.label}
        error={errors.password}
        required
      >
        <Input
          id={PASSWORD_ID}
          name={loginField.password}
          type={inputType.PASSWORD}
          value={values.password}
          placeholder={fields.password.placeholder}
          autoComplete={autoCompleteToken.CURRENT_PASSWORD}
          hasError={Boolean(errors.password)}
          aria-describedby={buildFieldDescribedBy(
            PASSWORD_ID,
            Boolean(errors.password),
          )}
          onChange={(event) =>
            handleChange(loginField.password, event.target.value)
          }
        />
      </FormField>

      <div className={loginFormStyles.actions}>
        <Button
          type={buttonType.SUBMIT}
          disabled={isSubmitting}
          className={loginFormStyles.submit}
        >
          {isSubmitting
            ? t.auth.login.submit.loading
            : t.auth.login.submit.idle}
        </Button>
      </div>
    </form>
  );
}
