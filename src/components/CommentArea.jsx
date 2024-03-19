import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = function (props) {
  // state = {
  //   comments: [],
  //   isLoading: false,
  //   isError: false,
  // };

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }

  useEffect(() => {
    const fetchData = async () => {
      if (props.asin) {
        setIsLoading(true);
        setIsError(false);
        // this.setState({
        //   isLoading: true,
        // });
        try {
          let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + props.asin, {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTlhOTRjNTllYzAwMTk5MGQ3NDYiLCJpYXQiOjE3MTA4NTQ0NDAsImV4cCI6MTcxMjA2NDA0MH0.7Mh6G2QtPPEX_QeUbZNjvxlUuuE3ZT3FztY81QEfXUg",
            },
          });
          console.log(response);
          if (response.ok) {
            let comments = await response.json();
            setComments(comments);
            setIsLoading(false);
            // this.setState({
            //   comments: comments,
            //   isLoading: false,
            //   isError: false,
            // });
          } else {
            setIsLoading(false);
            setIsError(true);
            // this.setState({ isLoading: false, isError: true });
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          setIsError(true);
          // this.setState({ isLoading: false, isError: true });
        }
      }
    };
    fetchData();
  }, [props.asin]);

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
