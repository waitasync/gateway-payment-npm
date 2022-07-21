import axios, { AxiosResponse } from "axios";
import camelcaseKeys from "camelcase-keys";
import { IHttpRequestOptions, TErrorGeneric } from "../doman";
import { EnumMethodHttp } from "../doman/enums/EnumMethodHttp";

const timeout: number = 5000;

export default async function ({
  data,
  options,
}: {
  data?: any;
  options: IHttpRequestOptions;
}): Promise<AxiosResponse | TErrorGeneric> {
  try {
    let response;
    const url = `${options.hostname}/${options.path}`;

    console.log(777, url, data);
    const dataPost =
      data &&
      JSON.stringify(data)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    if (options.method == EnumMethodHttp.PUT) {
      // if (options?.headers)
      //   options.headers["Content-Length"] = Buffer.byteLength(dataPost);

      response = await axios.put(url, dataPost, {
        timeout,
        headers: options.headers,
      });
    } else if (options.method == EnumMethodHttp.GET) {
      response = await axios.get(url, {
        timeout,
        headers: options.headers,
      });
    } else if (options.method == EnumMethodHttp.POST) {
      // if (options?.headers)
      //   options.headers["Content-Length"] = Buffer.byteLength(dataPost);

      response = await axios.post(url, dataPost, {
        timeout,
        headers: options.headers,
      });
    } else {
      return {
        err: true,
        data: {
          message: "Method undefined",
        },
      };
    }

    if (response.statusCode && [200, 201].indexOf(response.statusCode) === -1)
      return {
        err: true,
        data: {
          message: response.data,
          status: response.statusCode,
        },
      };

    const dataReturn = {
      ...camelcaseKeys(response.data, { deep: true }),
    };

    return {
      err: false,
      data: dataReturn,
    };
  } catch (error: any) {
    console.log(1111, error);
    return {
      err: true,
      data: {
        status: error?.response?.status,
        message: error?.response?.statusText || "unexpected error",
      },
    };
  }
}
