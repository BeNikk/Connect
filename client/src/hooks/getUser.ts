const getUser = async () => {
    try {
      const res = await fetch(`/api/user/${username}`);
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  export default getUser;