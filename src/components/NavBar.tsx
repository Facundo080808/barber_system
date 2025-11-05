import { View, TouchableOpacity } from "react-native";
import { Link, usePathname } from "expo-router";
import { Home, Users, Calendar } from "lucide-react-native";

export default function NavBar() {
  const pathname = usePathname();

  const items = [
    { href: "/", icon: Home },
    { href: "/clients", icon: Users },
    { href: "/shifts", icon: Calendar },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#007bff",
        paddingVertical: 12,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 40,
      }}
    >
      {items.map(({ href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} asChild>
            <TouchableOpacity style={{ alignItems: "center" }}>
              <Icon color={active ? "#fff" : "#d9e3ff"} size={28} />
            </TouchableOpacity>
          </Link>
        );
      })}
    </View>
  );
}
