// #region Global Imports
import "isomorphic-unfetch"
import { stringify } from "query-string"
// #endregion Global Imports

// #region Interface Imports
import { HttpModel } from "@Interfaces"
// #endregion Interface Imports

// const BaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;
const BaseUrl = `https://price.chansoo1280.site`
export const Http = {
    Request: async <A>(methodType: string, url: string, params?: HttpModel.IRequestQueryPayload, payload?: HttpModel.IRequestPayload): Promise<A> => {
        return new Promise((resolve, reject) => {
            const query = params
                ? `?${stringify({
                      ...params,
                      api_key: process.env.NEXT_PUBLIC_API_KEY,
                  })}`
                : ""

            fetch(`${BaseUrl}${url}${query}`, {
                body: JSON.stringify(payload),
                cache: "no-cache",
                headers: {
                    "content-type": "application/json",
                    SECRET: "asdY235h^&@!%Y&~!~",
                },
                method: `${methodType}`,
            })
                .then(async (response) => {
                    if (response.status === 200) {
                        return response.json().then((res) => {
                            console.log(res)
                            resolve(res)
                        })
                    }
                    return reject(response)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    },
}
