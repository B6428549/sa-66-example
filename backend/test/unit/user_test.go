package unit

import(
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/B6428549/sa-66-example/entity"
)

func TestUserfail(t *testing.T){
	g := NewGomegaWithT(t)
	t.Run(`FirstName is required`, func(t *testing.T) {
		uint1 := uint(1)
		user := entity.User{
			FirstName: "", //false
			LastName:  "test",
			Email:     "test@gmail.com",
			Phone:     "0800000000",
			Profile:   "dsafsdafsdfsdfdsfdsfsfsfsfs",
			GenderID:   &uint1,
		}
		ok, err := govalidator.ValidateStruct(user)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("FirstName is required"))
	})


}