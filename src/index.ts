import { app } from "./main";
import 'dotenv/config'

const port = process.env.PORT ? Number(process.env.PORT) : 3000

app.listen(port, () => {
    console.log(`Server running! Port: ${port}`);
})
