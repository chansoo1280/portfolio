// #region Global Imports
import * as React from "react"
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document"
import { ServerStyleSheet } from "styled-components"
// #endregion Global Imports

class WebAppDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<{
        styles: JSX.Element
        html: string
        head?: (JSX.Element | null)[] | undefined
    }> {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } catch (error) {
            throw error
        } finally {
            sheet.seal()
        }
    }

    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <meta name="description" content="Chansoo's Portfolio" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css"></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default WebAppDocument
