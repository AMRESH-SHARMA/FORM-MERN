import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
// import bat from "./bat.png"; 

export default function Example(props) {
  return (
    <Card className="w-96 py-5 mt-10 hover:bg-[#9ca3af]">
      <CardHeader floated={false} className="h-65">
        <img 
        src={props.imgUrl} 
        alt="thumbnail" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {props.title}
        </Typography>
      </CardBody>
    </Card>
  );
}