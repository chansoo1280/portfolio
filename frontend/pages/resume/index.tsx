// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { LayoutCode, WorkList, SkillList } from "@Components"
import { useEffect } from "react"
import { NavIdx, Title, Profile } from "@Components"
import { useDispatch } from "react-redux"
import { AppActions } from "@Reducers"
// #endregion Local Imports

const Page = (): JSX.Element => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(AppActions.setNav(NavIdx.RESUME))
    }, [])
    return (
        <>
            <Title as="h1" ir>
                resume
            </Title>
            <Title as="h2" ir>
                profile
            </Title>
            <Profile />
            <Title as="h2" center type="primary">
                Works
            </Title>
            <WorkList>
                <WorkList.Item
                    TitleProps={{
                        children: "KIYO - 통합계정관리",
                        as: "h3",
                        type: "primary",
                    }}
                    date="2021-11~2021-12"
                    ImgProps={{
                        src: "/static/images/WorkList/work01.svg",
                        alt: "안전하게 통합계정관리 / 간편한 화면구성",
                    }}
                />
                <WorkList.Item
                    TitleProps={{
                        children: "알고싶은 서울물가",
                        as: "h3",
                        type: "primary",
                    }}
                    date="2021-08~2021-12"
                    ImgProps={{
                        src: "/static/images/WorkList/work02.svg",
                        alt: "알고싶은 서울물가",
                    }}
                />
            </WorkList>
            <Title as="h2" center>
                Skill
            </Title>
            <SkillList>
                <SkillList.Item>Front-End : Next.js(TypeScript), React.js, HTML, CSS, JavaScript</SkillList.Item>
                <SkillList.Item isSub>Back-End : Node.js, Nest.js</SkillList.Item>
                <SkillList.Item isSub>Database : SQL server</SkillList.Item>
                <SkillList.Item isSub>DevOps : AWS(EC2, RDS 등), Docker, Jenkins, Git</SkillList.Item>
                <SkillList.Item isSub>APP : React Native</SkillList.Item>
            </SkillList>
        </>
    )
}
export const getStaticProps = async (): Promise<any> => ({
    props: {
        layout: LayoutCode.Info,
        transition: "info",
    },
})
export default Page
