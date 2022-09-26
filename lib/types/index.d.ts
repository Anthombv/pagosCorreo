import { FormikProps, FormikErrors, FormikTouched } from "formik";

//tipos de datos para la app
export type AuthContextProps = {
  auth: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

export type ResponseData = {
  message?: string;
  data?: any;
  success: boolean;
};

export type LoginData = {
  userName: string;
  password: string;
};

export type UserRole = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type UserDeparment = {
  id?: string;
  name: string;
};

export type User = {
  id?: string;
  userName: string;
  password?: string;
  name: string;
  email: string;
  department: UserDeparment;
  identificationCard: string;
  dateBirth: string;
  age: number;
  dateAdmission: string;
  position: string
  role: UserRole;
  cellphone: string;
};

export type CloudImage = {
  secure_url: string;
};

export type Solicitude = {
  id?: string;
  number: number;
  soliciter: string;
  typePermissions: string;
  details: string;
  state: string;
  dateState: string; 
  date: string;
  dateS: string;
  dateE: string;
}

export type Backup = {
  id?: string;
  solicitude: any | Solicitude;
};

export type Auditory = {
  id?: string;
  date: string;
  user: string;
  action: string;
};

export interface ModalProps<T> {
  visible: boolean;
  close: () => void;
  onDone?: (data?: T) => void | Promise<void>;
}

export interface FormikComponentProps<T = Element> extends FormikProps<T> {
  formik: {
    values: T;
    handleChange: {
      (e: ChangeEvent<any>): void;
      <T_1 = string | ChangeEvent<T>>(field: T_1): T_1 extends ChangeEvent<T>
        ? void
        : (e: string | ChangeEvent<T>) => void;
    };
    touched: FormikTouched<T>;
    errors: FormikErrors<T>;
    setFieldValue: (
      field: string,
      value: T,
      shouldValidate?: boolean
    ) => Promise<void> | Promise<FormikErrors<T>>;
    setFieldError: (field: string, value: string) => void;
  };
}
