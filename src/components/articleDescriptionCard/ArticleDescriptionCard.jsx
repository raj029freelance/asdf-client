import "./ArticleDescription.scss";
import { Card } from "antd";

const ArticleDescriptionCard = ({ overview }) => {
  return (
    overview && (
      <Card
        title={
          <h3 style={{ textAlign: "start", marginBottom: 0 }}>Description</h3>
        }
        style={{ marginTop: "1rem" }}
      >
        <div className="article-description">
          <div dangerouslySetInnerHTML={{ __html: overview }} />
        </div>
      </Card>
    )
  );
};

export default ArticleDescriptionCard;
