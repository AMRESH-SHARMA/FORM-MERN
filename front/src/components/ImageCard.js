import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Example(props) {
  return (

    <Card className="w-96 py-5 mt-10 hover:bg-[#581c87]">
      <Link to={`/page3/${props.id}`}>
      <CardHeader floated={false} className="h-65">
        <img 
        src={props.imgUrl} 
        alt="thumbnail" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="black" className="mb-2 ">
          {props.title}
        </Typography>
      </CardBody>
      </Link>
    </Card>
  );
}