import { GetServerSideProps } from "next";
import Navbar from "../components/Navbar";

type Subscription = {
  id: string;
  email: string;
  plan: string;
  status: string;
  created_at: string;
  current_period_end?: string;
};

type Props = {
  subscriptions: Subscription[];
};

export default function AdminDashboard({ subscriptions }: Props) {
  return (
    <>
      <Navbar />

      <div style={{ padding: 40 }}>
        <h1>Admin Dashboard</h1>
        <p>Total Subscribers: {subscriptions.length}</p>

        <table
          style={{
            marginTop: 20,
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={th}>Email</th>
              <th style={th}>Plan</th>
              <th style={th}>Status</th>
              <th style={th}>Purchased</th>
              <th style={th}>Expiry</th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.map((sub) => {
              const expired =
                sub.current_period_end &&
                new Date(sub.current_period_end) < new Date();

              return (
                <tr key={sub.id}>
                  <td style={td}>{sub.email}</td>
                  <td style={td}>{sub.plan}</td>

                  <td
                    style={{
                      ...td,
                      color:
                        sub.status === "active" && !expired
                          ? "green"
                          : "red",
                    }}
                  >
                    {expired ? "expired" : sub.status}
                  </td>

                  <td style={td}>
                    {new Date(sub.created_at).toDateString()}
                  </td>

                  <td style={td}>
                    {sub.current_period_end
                      ? new Date(sub.current_period_end).toDateString()
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ================= SERVER SIDE ================= */

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const adminKey = ctx.req.headers["x-admin-key"];

  if (adminKey !== process.env.ADMIN_KEY) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/subscriptions`,
    {
      headers: {
        "x-admin-key": process.env.ADMIN_KEY!,
      },
    }
  );

  const subscriptions = await res.json();

  return {
    props: {
      subscriptions,
    },
  };
};

/* ================= STYLES ================= */

const th = {
  borderBottom: "1px solid #ddd",
  textAlign: "left" as const,
  padding: 8,
};

const td = {
  borderBottom: "1px solid #eee",
  padding: 8,
};
