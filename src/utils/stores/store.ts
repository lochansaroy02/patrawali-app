
import axios from "axios";
import { create } from "zustand";




interface deceade {
    id?: string;
    deceadName: string;
    deceadDesgnation: string;
    pno: string;
    deathDate: string;
    dependentName: string;
    depandentRelation: string;
    applicationDate: string;
    postForAppointment: string;
    fileNo: string;
    apporvalDate: string;
    createdAt?: string;
    updatedAt?: string;
}
interface DeceadeStore {
    deceadeEntry: deceade[];
    loading: boolean;
    error: string | null;
    fetchData: () => Promise<void>;
    addData: (deceadeData: deceade) => Promise<void>;
}

const initialField = {

}
export const useDeceadeStore = create<DeceadeStore>((set, get) => ({
    deceadeEntry: [],
    loading: false,
    error: null,
    fetchData: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get("/api/deceade");
            if (response.data.success) {
                set({ deceadeEntry: response.data.data, loading: false });
            } else {
                set({ error: "Failed to fetch seized vehicles", loading: false });
            }
        } catch (error: any) {
            console.error("GET /api/siezed error:", error);
            set({ error: error.message || "Server error", loading: false });
        }
    },

    addData: async (deceadeData: any) => {
        try {
            const response = await axios.post("/api/deceade", deceadeData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.data.success) {
                const newData = response.data.data;
                console.log(newData)
            } else {
                console.error("POST /api/siezed error: Failed to create vehicle");
            }
        } catch (error: any) {
            console.error("POST error:", error);
            set({ error: error.message || "Failed to create seized vehicle" });
        }
    },
}));
