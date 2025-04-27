import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Divider } from "@chakra-ui/react";
import moment from "moment";

export default function Note({ note }) {  // Принимаем объект note целиком
  return (
    <Card variant="filled">
      <CardHeader>
        <Heading size="md">{note?.title || "Без названия"}</Heading>
      </CardHeader>
      <Divider borderColor="gray.200" />
      <CardBody>
        <Text>{note?.description || "Нет описания"}</Text>
      </CardBody>
      <Divider borderColor="gray.200" />
      <CardFooter>
        {note?.createdAt 
          ? moment(note.createdAt).format("DD/MM/YYYY HH:mm:ss") 
          : "Дата неизвестна"}
      </CardFooter>
    </Card>
  );
}