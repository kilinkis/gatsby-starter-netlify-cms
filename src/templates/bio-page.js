import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
//import Img from "gatsby-image";
import { Window, TitleBar, Text } from "react-desktop/macOs";
import Typist from "react-typist";

export const BioPageTemplate = ({
  title,
  content,
  contentComponent,
  image
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section section--gradient">
      <Window
        chrome
        height="500px"
        width="50%"
        background="#000"
        className="window"
        padding="0"
      >
        <TitleBar title="website" controls />
        <Typist>{content}</Typist>
      </Window>
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

BioPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const BioPage = ({ data }) => {
  const { markdownRemark: post } = data;

  //console.log("data " + JSON.stringify(data.file));

  return (
    <Layout>
      <BioPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        image={data.file}
      />
    </Layout>
  );
};

BioPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default BioPage;

export const bioPageQuery = graphql`
  query BioPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
