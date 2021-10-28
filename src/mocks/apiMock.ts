import contribuicoesMock from '../contribuicoes/mock'

export type AxiosMock = {
    active: boolean;
    url: string;
    method: string;
    data: any;
    status: number;
    message?: string;
  };
  export default [...contribuicoesMock] as AxiosMock[];