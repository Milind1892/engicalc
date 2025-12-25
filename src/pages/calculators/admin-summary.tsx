// pages/calculators/admin-summary.tsx

import { GetServerSideProps } from "next";

export const dynamic = "force-dynamic";

type Props = {
  total_users: string;
  premium_users: string;
  total_revenue: string;
};

export default function AdminSummary(props: Props) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Summary</h1>

      <ul>
        <li>Total Users: {props.total_users}</li>
        <li>Premium Users: {props.premium_users}</li>
        <li>Total Revenue: {props.total_revenue}</li>
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // later you can replace this with Supabase queries
    return {
      props: {
        total_users: "unlimited",
        premium_users: "unlimited",
        total_revenue: "unlimited",
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        total_users: "error",
        premium_users: "error",
        total_revenue: "error",
      },
    };
  }
};
