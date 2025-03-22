import { ref } from "vue";

const useCardConfig = (colName) => {
  const error = ref("");
  const isPending = ref(false);

  const getDocumentRealtime = (documentId) => {
    return ref({
      showProfileImg: true,
      themeColor: "light",
      watermarkDefault: true,
      watermarkName: "nandle",
    });
  };

  const getDocument = async (documentId) => {
    return ref({
      showProfileImg: true,
      themeColor: "light",
      watermarkDefault: true,
      watermarkName: "nandle",
    });
  };

  return {
    getDocumentRealtime,
    getDocument,
    error,
    isPending,
  };
};

export default useCardConfig;
