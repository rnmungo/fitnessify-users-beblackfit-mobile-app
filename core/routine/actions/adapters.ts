import { Paged } from "@/core/shared/interfaces/search";
import { UserRoutineData } from "./types";
import { UserRoutine, RoutineLevel } from "../interfaces/routine";

export const adaptUserRoutineSearch = (responseData: Paged<UserRoutineData>): Paged<UserRoutine> => ({
  results: responseData.results.map(result => ({
    createdAt: result.createdAt,
    lastRoutineExercise: result.lastRoutineExercise,
    lastRoutineSection: result.lastRoutineSection,
    routineDuration: result.routine.duration,
    routineId: result.routine.id,
    routineLevel: result.routine.level as RoutineLevel,
    routineName: result.routine.name,
  })),
  currentPage: responseData.currentPage,
  sizeLimit: responseData.sizeLimit,
  total: responseData.total,
  pages: responseData.pages,
});
