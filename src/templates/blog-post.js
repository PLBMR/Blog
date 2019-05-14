import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio.js';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';
import Tag from '../components/common/tag.js';

class BlogPostTemplate extends React.Component {
  getTags() {
    if (!this.props.data.markdownRemark.frontmatter.tags) {
      return null;
    }
    const tags = this.props.data.markdownRemark.frontmatter.tags
      .map(a => a.toLowerCase())
      .sort()
      .map(tag => <Tag key={tag} tagName={tag} />);
    return (
      <div>
        Tagged In:
        {tags}
        <br />
      </div>
    );
  }

  getAuthor() {
    const authorId = this.props.data.markdownRemark.frontmatter.author;
    if (!authorId) {
      return null;
    }
    return this.props.data.allAuthorsJson.nodes.find(i => i.id === authorId);
  }

  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h1>{post.frontmatter.title}</h1>
        <time
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </time>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {this.getTags()}
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio author={this.getAuthor()} />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    allAuthorsJson {
      nodes {
        id
        name
        avatar
        twitter
        github
      }
    }
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        author
        tags
      }
    }
  }
`;
