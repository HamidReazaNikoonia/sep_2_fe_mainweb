import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const favorites = [
  {
    id: "۱",
    name: "کیبورد مکانیکی",
    type: "محصول",
    price: "۱۲۰,۰۰۰ تومان",
  },
  {
    id: "۲",
    name: "مبانی توسعه وب",
    type: "دوره",
    price: "۱۹۹,۰۰۰ تومان",
  },
  {
    id: "۳",
    name: "ماوس ارگونومیک",
    type: "محصول",
    price: "۶۵,۰۰۰ تومان",
  },
]

export default function FavoritesPage() {
  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle>علاقه‌مندی‌های شما</CardTitle>
        <CardDescription>لیست محصولات و دوره‌های مورد علاقه شما</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {/* <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">نام</TableHead>
                <TableHead>نوع</TableHead>
                <TableHead>قیمت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {favorites.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
        </div>
      </CardContent>
    </Card>
  )
}

