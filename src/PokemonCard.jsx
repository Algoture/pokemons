import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PokemonCard = ({ pokemoname, ability, species, img }) => {
  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const name = capitalizeFirstLetter(pokemoname);
  const abilityData = capitalizeFirstLetter(ability);
  const speciesName = capitalizeFirstLetter(species);

  return (
    <Card className="rounded-2xl shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <CardHeader className="text-center p-4">
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
        <CardDescription>Species: {speciesName}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center p-4 bg-gray-100">
        <img className="object-contain w-full" src={img} alt={name} />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-center font-medium">Ability: {abilityData}</p>
      </CardFooter>
    </Card>
  );
};

export default PokemonCard;
