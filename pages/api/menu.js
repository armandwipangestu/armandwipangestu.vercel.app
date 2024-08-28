import Cors from "cors";

const cors = Cors({
  methods: ["GET"],
});

const handler = async (req, res) => {
  cors(req, res, async () => {
    res.status(200).json({ data });
  });
};

const data = [
  { title: "Beranda", target: "/" },
  { title: "Tentang Saya", target: "/tentang-saya" },
  // { title: "Portofolio", target: "/portofolio" },
  { title: "Portofolio", target: "/Portfolio.pdf" },
  { title: "Skills", target: "/skills" },
  { title: "Pendidikan", target: "/pendidikan" },
  { title: "Pengalaman", target: "/pengalaman" },
  { title: "Blog", target: "/blog" },
];

export default handler;
