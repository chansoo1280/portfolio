// #region Global Imports
import className from "classnames"
// #endregion Global Imports

// #region Local Imports
import styles from "./Contact.module.scss"

// #endregion Local Imports

// interface Props {
// }
export const Contact = (): JSX.Element => {
    return (
        <>
            <ul className={styles["contact"]}>
                <li className={styles["contact__item"]}>
                    <i className={className("xi-mail", styles["contact__icon"])}></i>
                    <dl className={styles["contact__info"]}>
                        <dt className="ir">이메일</dt>
                        <dd>
                            <a className={styles["contact__text"]} href="mailto:chansoo1280@naver.com">
                                chansoo1280@naver.com
                            </a>
                        </dd>
                    </dl>
                </li>
                <li className={styles["contact__item"]}>
                    <i className={className("xi-maker", styles["contact__icon"])}></i>
                    <dl className={styles["contact__info"]}>
                        <dt className="ir">위치</dt>
                        <dd>
                            <a className={styles["contact__text"]} href="http://kko.to/TgIXJst4M" target="_blank">
                                Korea, seoul
                            </a>
                        </dd>
                    </dl>
                </li>
                <li className={styles["contact__item"]}>
                    <i className={className("xi-github", styles["contact__icon"])}></i>
                    <dl className={styles["contact__info"]}>
                        <dt className="ir">깃허브</dt>
                        <dd>
                            <a className={styles["contact__text"]} href="https://github.com/chansoo1280" target="_blank">
                                chansoo1280
                            </a>
                        </dd>
                    </dl>
                </li>
                <li className={styles["contact__item"]}>
                    <i className={className("xi-blogger", styles["contact__icon"])}></i>
                    <dl className={styles["contact__info"]}>
                        <dt className="ir">블로그</dt>
                        <dd>
                            <a className={styles["contact__text"]} href="https://chansoo1280.tistory.com/" target="_blank">
                                chansoo1280.tistory.com
                            </a>
                        </dd>
                    </dl>
                </li>
            </ul>
        </>
    )
}
