class Note
  include Mongoid::Document
  field :title, type: String
  field :content, type: String

  def as_json(*args)
    res = super
    res['id'] = self.id.to_s
    res
  end
end
